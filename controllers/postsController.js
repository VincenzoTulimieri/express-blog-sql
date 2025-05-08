// express 
const express = require('express')

// importazione dei dati
const posts = require('../data/posts.js');
const connection = require('../data/db.js')

// const { error } = require('console');


// index
function index(req, res) {
    // dichiarazione query
    const sql = 'SELECT * FROM posts';

    // esecuzione query
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database non trovato' })
        };
        res.json(results);
    });

}

// show
function show(req, res) {
    // Id dell'utente
    const currentId = parseInt(req.params.id);

    // dichiarazione query
    const postSql = 'SELECT * FROM posts WHERE id = ?'
    const tagSql = `
        SELECT tags.*
        FROM tags
        JOIN post_tag 
        ON tags.id = post_tag.tag_id 
        WHERE post_tag.post_id = ?;
    `

    // esecuzione query
    connection.query(postSql, [currentId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database non trovato' })
        };
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post non trovato' })
        };

        const post = results[0]
        // res.json(post)
        connection.query(tagSql,[currentId],(err,results)=>{
            if(err){
                return res.status(500).json({error:'Database non trovato'})
            };
            post.tags= results;
            res.json(post)
        });
    });

}

// store
function store(req, res) {
    const newId = posts[posts.length - 1].id + 1;
    const newPost = {
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
function update(req, res) {
    const currentId = parseInt(req.params.id);
    const currentPost = posts.find(post => post.id === currentId)
    if (!currentPost) {
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
function modify(req, res) {
    const currentId = parseInt(req.params.id);
    const currentPost = posts.find(post => post.id === currentId)
    if (!currentPost) {
        res.status(404)
        return res.json({
            error: 'Not found',
            message: 'Post non trovato'
        })
    }
    if (req.body.title) {
        currentPost.title = req.body.title;
    }
    if (req.body.content) {
        currentPost.content = req.body.content;
    }
    if (req.body.tags) {
        currentPost.tags = req.body.tags;
    }
    console.log(posts)
    res.json(currentPost)

}


// destroy
function destroy(req, res) {
    // Id dell'utente
    const currentId = parseInt(req.params.id);

    // esecuzione query
    const sql = 'DELETE FROM posts WHERE id=?'
    connection.query(sql,[currentId],(err,results)=>{
        if (err) {
            return res.status(500).json({ error: 'Database non trovato' })
        };
        res.sendStatus(204);
    }); 
}

// esportazione controller
module.exports = { index, show, store, update, modify, destroy }