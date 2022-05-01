const products = require('../model/Products')

const getAllProductStatic = async (req, res) => {
    // So, when we throw an error here, to simly resolve, we just need to define "express-async-errors"
    // throw new Error("Throwing a new error")

    // let Products = await products.find({ company:'ikea' })
    // If you want to search based on properties which don't contain enough information of value
    // But the string you put as a param for those properties must be in order and appear in the value of those properties
    let search = {
        company: {
            $regex: 'ke',
            $options: 'i'
        },
        feature: false,
        price: {
            $gt: 20,
            $lt: 40
        }
    }
    // Remember, If we use query on database of Mongoose, the result will be a list. So we can use all the method which can be applied to list
    // If we want to sort by DESC, put "-" before properties
    // Sort method will sort orderly (Which property first, result will be sorted by that property first
    // Note: The skip(index)-method will igrore the index-th element of the final result
    let Products = await products.find( search ).sort('-price').select('name price rating')
    res.status(200).json({ "Message":Products, nbHits:Products.length })
}

const getAllProducts = async (req, res) => {
    // console.log(req.query)
    let allPropertiesInQuery = Object.getOwnPropertyNames(req.query)
    let queryCondition = {}
    const allProperties = ['name', 'feature', 'company', 'rating', 'price', 'createAt']

    for (let i=0; i < allProperties.length; i++) {
        if ( allPropertiesInQuery.includes(allProperties[i]) ) {
            if (allProperties[i] === 'name') {
                queryCondition.name = {
                    $regex: req.query.name,
                    $options: 'i'
                }
            }
            else if (allProperties[i] === 'company') {
                queryCondition.allProperties[i] = { 
                    $regex: req.query.allProperties[i], 
                    $options: 'i' 
                }
            }
            else if (allProperties[i] === 'feature') {
                queryCondition.allProperties[i] = (req.query.allProperties[i] === 'true') ? true : false
            }
            else if (allProperties[i] === 'price' || allProperties[i] === 'rating') {
                queryCondition.allProperties[i] = Number(req.query.allProperties[i])
            }
            else {
                queryCondition.allProperties[i] = req.query.allProperties[i]
            }
        }
    }

    if (req.query.filter) {
        let operator = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        // Replace all operator exists in "filter-query". Split it into number of queries, each query will be add/ update
        // in condition-query
        let reqEx = /\b(<|>|<=|>=|=)\b/g
        let filter = req.query.filter.replace(reqEx, (match) => `-${operator[match]}-`).split(',').forEach((item) => {
            console.log(item)
            try {
                let [property, operator, value] = item.split('-')
                // Check if a given property exists or not in all of properties of the table
                if (allProperties.includes(property)) {
                    // Add/ Update operator condition
                    if (!queryCondition[property])
                        queryCondition[property] = { [operator]: Number(value) }
                    else
                        queryCondition[property][`${operator}`] = Number(value)
                }
            } catch(err) { }
        })
    }
    let Products = products.find( queryCondition )
    console.log(queryCondition)

    // Sort result by DESC or ASC based on the properties which are as params
    if (req.query.sort) {
        // So, we usually use sort on URL by using this syntax "...<sort>=<-property_1>,<property_2>..."
        // But the correct syntax when using sort()-method "sort(<-property_1> <property_2>)"
        let listSort = req.query.sort.split(',').join(' ')
        Products = Products.sort(listSort)
    }

    // Select properties for showing to the end-users
    if (req.query.select) {
        let listSelect = req.query.select.split(',').join(' ')
        Products = Products.select(listSelect)
    }

    // Limmit number of element of the result
    // Ignore the index-th element of the final result
    const pageNumber = Number(req.query.pageNumber) || 1
    const limit = Number(req.query.limit) || 20
    const skip = Number(req.query.skip) || 0
    Products = Products.limit(limit).skip(skip)
    // Instead of await directly the products.find()-method, we can put that method and those methods which process
    // on the result after using find()-method in Event loop, and we call await with those methods

    Products = await Products
    // If there is no result
    if (Products.length==0) {
        res.status(404).json({ "Message":"No product with given information" })
        return
    }
    res.status(200).json({ "Message":Products, nbHits:Products.length })
}

module.exports = {
    getAllProductStatic,
    getAllProducts
}