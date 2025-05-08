// express 
const express = require('express')

// importazione dei dati
const posts = require('../data/posts.js');

// const { error } = require('console');


// index
function index(req,res){
    const queryTags = req.query.tags;

    if(queryTags){
        const currentTag = posts.filter(post => post.tags.includes(queryTags))
        res.json(currentTag)
    }

    res.json(posts);
}

// show
function show(req,res){
    const currentId = parseInt(req.params.id);
    const currentPost = posts.find(post => post.id === currentId)
    if(!currentPost){
        res.status(404)
        return res.json({
            error: 'Not found',
            message: 'Post non trovato'
        })
    }
    res.json(currentPost)
}

// store
function store(req,res){
    const newId = posts[posts.length -1].id +1;
    const newPost ={
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    posts.push(newPost)
    res.send(posts)
}

// update
function update(req,res){
    const currentId = parseInt(req.params.id);
    const currentPost = posts.find(post => post.id === currentId)
    if(!currentPost){
        res.status(404)
        return res.json({
            error: 'Not found',
            message: 'Post non trovato'
        })
    }
    currentPost.title = req.body.title;
    currentPost.content = req.body.content;
    currentPost.tags = req.body.tags;
    console.log(posts)
    res.json(currentPost)
    
}

// modify
function modify(req,res){
    const currentId = parseInt(req.params.id);
    const currentPost = posts.find(post => post.id === currentId)
    if(!currentPost){
        res.status(404)
        return res.json({
            error: 'Not found',
            message: 'Post non trovato'
        })
    }
    if(req.body.title){
        currentPost.title = req.body.title;
    }
    if(req.body.content){
        currentPost.content = req.body.content;
    }
    if(req.body.tags){
        currentPost.tags = req.body.tags;
    }
    console.log(posts)
    res.json(currentPost)
    
}


// destroy
function destroy(req,res){
    const currentId = parseInt(req.params.id);
    const currentPost = posts.find(post => post.id === currentId)
    if(!currentPost){
        res.status(404)
        return res.json({
            error: 'Not found',
            message: 'Post non trovato'
        })
    }
    
    posts.splice(posts.indexOf(currentPost),1)
    res.sendStatus(204)
    
}

// esportazione controller
module.exports = {index,show,store,update,modify,destroy}