import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {questions,tracks,publicQuestion} from './src/questions.js';
import {evaluate} from './src/evaluate.js';
const root=path.dirname(fileURLToPath(import.meta.url));
export function createApp(dataPath=path.join(root,'data','sessions.json')) {
  fs.mkdirSync(path.dirname(dataPath),{recursive:true});
  let sessions=[];
  if(fs.existsSync(dataPath)) { try { sessions=JSON.parse(fs.readFileSync(dataPath,'utf8')); if(!Array.isArray(sessions))throw Error(); } catch {throw new Error('Could not read sessions.json. Back it up and repair or rename it before restarting.');} }
  const save=()=>{const temp=dataPath+'.tmp'; fs.writeFileSync(temp,JSON.stringify(sessions,null,2));fs.renameSync(temp,dataPath);};
  const app=express(); app.disable('x-powered-by');
  app.use(express.json({limit:'32kb'}));
  app.use((req,res,next)=>{res.set('X-Content-Type-Options','nosniff');res.set('Cache-Control','no-store');next();});
  const view=s=>({...s,questions:s.questionIds.map(id=>publicQuestion(questions.find(q=>q.id===id))),questionIds:undefined});
  app.get('/api/health',(req,res)=>res.json({ok:true,mode:'local-rubric'}));
  app.get('/api/config',(req,res)=>res.json({tracks,questionCount:questions.length,mode:'local-rubric'}));
  app.get('/api/sessions',(req,res)=>res.json(sessions.map(s=>({id:s.id,name:s.name,track:s.track,level:s.level,status:s.status,createdAt:s.createdAt,total:s.questionIds.length,answered:s.answers.length,score:s.answers.length?Math.round(s.answers.reduce((n,a)=>n+a.feedback.score,0)/s.answers.length):0})).reverse()));
  app.post('/api/sessions',(req,res)=>{
    const {name,track,level,count}=req.body??{};
    if(typeof name!=='string'||!name.trim()||name.trim().length>60||!tracks.some(t=>t.id===track)||!['beginner','intermediate'].includes(level)||![3,5].includes(count))return res.status(400).json({error:'Provide a name (1–60 characters), valid track, level and 3 or 5 questions.'});
    const bank=questions.filter(q=>q.track===track).sort((a,b)=>Number(b.level===level)-Number(a.level===level));
    const s={id:randomUUID(),name:name.trim(),track,level,questionIds:bank.slice(0,count).map(q=>q.id),answers:[],status:'active',createdAt:new Date().toISOString()};
    sessions.push(s);try{save();}catch(e){sessions.pop();throw e;}res.status(201).json(view(s));
  });
  app.get('/api/sessions/:id',(req,res)=>{const s=sessions.find(s=>s.id===req.params.id);if(!s)return res.status(404).json({error:'Interview not found.'});res.json(view(s));});
  app.post('/api/sessions/:id/answers',(req,res)=>{
    const s=sessions.find(s=>s.id===req.params.id);if(!s)return res.status(404).json({error:'Interview not found.'});
    const {questionId,answer,seconds}=req.body??{};
    if(typeof answer!=='string'||answer.length>6000||!Number.isFinite(seconds)||seconds<0||seconds>86400)return res.status(400).json({error:'Answer must be at most 6,000 characters with a valid elapsed time.'});
    const existing=s.answers.find(a=>a.questionId===questionId);
    if(existing){if(existing.answer!==answer.trim())return res.status(409).json({error:'This question already has a saved answer.'});return res.json(view(s));}
    if(s.status!=='active'||s.questionIds[s.answers.length]!==questionId)return res.status(409).json({error:'Submit the current question in order.'});
    const before=structuredClone(s);
    s.answers.push({questionId,answer:answer.trim(),seconds:Math.round(seconds),feedback:evaluate(questions.find(q=>q.id===questionId),answer)});
    if(s.answers.length===s.questionIds.length){s.status='completed';s.completedAt=new Date().toISOString();}
    try{save();}catch(e){Object.assign(s,before);throw e;}res.json(view(s));
  });
  app.delete('/api/sessions/:id',(req,res)=>{const i=sessions.findIndex(s=>s.id===req.params.id);if(i<0)return res.status(404).json({error:'Interview not found.'});const previous=sessions;sessions=sessions.filter(s=>s.id!==req.params.id);try{save();}catch(e){sessions=previous;throw e;}res.status(204).end();});
  app.use('/api',(req,res)=>res.status(404).json({error:'API route not found.'}));
  app.use(express.static(path.join(root,'public')));
  app.use((err,req,res,next)=>{console.error(err.message);res.status(err.status||500).json({error:err.status===413?'Request too large.':err.status===400?'Invalid JSON request.':'Could not save or process this request. Check the terminal and try again.'});});
  return app;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const port=Number(process.env.PORT)||3000;
  const server=createApp().listen(port,'127.0.0.1',()=>console.log(`Interview Studio is ready: http://localhost:${port}\nPresentation: http://localhost:${port}/presentation.html\nPress Ctrl+C to stop.`));
  server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is busy. Stop the other app or set PORT to 3001.`:e.message);process.exitCode=1;});
}
