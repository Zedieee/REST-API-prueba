const express = require('express')
const app = express()
app.use(express.json())

 
/**
 * Creating the json pets data
 * 
 */

let pets = [
    {
        'id': 1,
        'name': 'Deku',
        'age': 5,
        'type': 'dog',
        'description': 'A cute brown dog'
        
    },
    {
        'id': 2,
        'name': 'Mochi',
        'age': 4,
        'type': 'dog',
        'description': 'A cute white dog'
    },
    {
        'id': 3,
        'name': 'Kayn',
        'age': 1,
        'type': 'dog',
        'description': 'A cute black dog'
    },
    {
        'id': 4,
        'name': 'Peanut',
        'age': 2,
        'type': 'Guinea Pig',
        'description': 'A cute brown Guinea Pig'
    },
    {
        'id': 5,
        'name': 'Dubalin',
        'age': 2,
        'type': 'Guinea Pig',
        'description': 'A cute multicolor Guinea Pig'
    }
    
]


/**
 * method to get all pets
 *  
 *
    */
app.get('/', (req, res) => {
    res.send('<h1>Pets API</h1>')
})



/**
 * @api {get} /pets List all pets
 * @apiName  Pet Store API
 * @apiGroup Pets
 * @apiDescription Get all pets
 *  
 * @apiSuccess {String} name Pet's name.
 * @apiSuccess {Number} age Pet's age.
 * @apiSuccess {String} type Pet's species.
 * @apiSuccess {String} descrreiption Pet's description.
 * 
 * @apiSuccessExample Success-Response:
 *    [
 *    {
        "id": 1,
        "name": "Deku",
        "age": 5,
        "type": "dog",
        "description": "A cute brown dog"
        
    },
    {
        "id": 2,
        "name": "Mochi",
        "age": 4,
        "type": "dog",
        "description": "A cute white dog"
    },
    {
        "id": 3,
        "name": "Kayn",
        "age": 1,
        "type": "dog",
        "description": "A cute black dog"
    },
    {
        "id": 4,
        "name": "Peanut",
        "age": 2,
        "type": "Guinea Pig",
        "description": "A cute brown Guinea Pig"
    },
    {
        "id": 5,
        "name": "Dubalin",
        "age": 2,
        "type": "Guinea Pig",
        "description": "A cute multicolor Guinea Pig"
]
 * 
 * 
 *
 */
app.get('/pets', (req, res) => {
    res.json(pets)

})

/**
* @api {get} /pets/:id get a pet by id
 * @apiName  Pet Store API
 * @apiGroup Get Pet by ID
 * @apiDescription Get specific pet by id
 *  
 * @apiparam {Number} id Pet's id.
 * @apiSuccess (200 OK) {json} pet Pet's data.
 * @apiSuccess {String} name Pet's name.
 * @apiSuccess {Number} age Pet's age.
 * @apiSuccess {String} type Pet's species.
 * @apiSuccess {String} description Pet's description.
 * 
 * @apiSuccessExample Success-Response:
 * {
	"id": 1,
	"name": "Deku",
	"age": 5,
	"type": "dog",
	"description": "A cute brown dog"
}
*/
app.get('/pets/:id', (req, res) => {
    const id = Number(req.params.id)
    const pet = pets.find(pet => pet.id == id)

    if (pet) {
        res.json(pet)
    } else {
        res.status(404).end()
    }
})

/**
 * @api {delete} /pets/:id Delete a pet
 * @apiName  Pet Store API
 * @apiGroup Delete Pets
 * @apiDescription Delete a pet
 *  
 * @apiparam {Number} id Pet's id.
 * @apiSuccess (204 no content) Success-Response:
    status 204
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 204 No Content
 * 
*/
app.delete('/pets/:id', (req, res) => {
    const id = Number(req.params.id)
    pets = pets.filter(pet => pet.id !== id)
    res.status(204).end()
})

/**
 *  * @api {post} /pets Add a pet
 * @apiName  Pet Store API
 * @apiGroup create a Pet
 * @apiDescription Create a pet
 *  
 * @apiParamExample Example Body:
 * {
	"name": "Peanut",
	"age": 3,
	"type": "Guinea pig",
	"description": "A cute pet"
}
    
 *  @apiSuccess (Succes 201) {json} pet Pet's data.
   
    * @apiSuccessExample Success-Response:
    * 
    * {
 *  "name": "Peanut",
    "age": 3,
    "type": "guinea pig",
    "description": "A cute brown guinea pig"
    }
 * */
app.post('/pets', (req, res) => {
    const pet = req.body
     
    if (!pet || !pet.name || !pet.age || !pet.type) {
        return res.status(400).json({
            error: 'pet is missing'
        })
    }
    const ids = pets.map(pet => pet.id)
    const maxId = Math.max(...ids)
    const newPet = {
        id: maxId + 1,
        name: pet.name,
        age: pet.age,
        type: pet.type,
        description: typeof pet.description !== 'undefined' ? pet.description : 'A cute pet'
    }
    pets = pets.concat(newPet)
    res.status(201).json(newPet)
})

/**
 * creating the server
 * */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
