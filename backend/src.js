const express = require("express");
const { writeFile } = require("fs");
const fs = require("fs").promises;

async function readFile(filePath){
    try {
        const data = await fs.readFile(filePath)
        console.log(data.toString());
    } catch (error) {
        console.log("Error reading file :" + error);
        
    }
}

// readFile() This is used for reading files
// writeFile() This is used write to files

readFile("greeting.txt")