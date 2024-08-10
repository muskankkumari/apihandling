import express from 'express';

const app = express();

app.get('/api/products', (req,res)=>{
    const products = [
        {
            id:1,
            name:'table wooden',
            price:2000,
            image:'https://images.app.goo.gl/Sfwcndh23amVHak17'
        },
        {
            id:2,
            name:'table glass',
            price:3050,
            image:'https://images.app.goo.gl/zyr1x6kYxwRtFhhn9'
        },
        {
            id:3,
            name:'table plastic',
            price:2500,
            image:'https://images.app.goo.gl/zxfze8PU76mSzUHm6'
        },
        {
            id:4,
            name:'table metal',
            price:1500,
            image:'https://images.app.goo.gl/u5z3j933nvuwCHkf7'
        },
        {
            id:5,
            name:'table polyester',
            price:5000,
            image:'https://images.app.goo.gl/WdQPCdZsf6aAfxeq6'
        },
    ]

    // http://localhost:3000/api/products?search=...

if(req.query.search){
    const filterProducts = products.filter(product => product.name.includes(req.query.search));
    res.send(filterProducts);
    // console.log(req.query.search)
    return;
}
res.send(products);
// setTimeout(()=>{
// res.send(products);
// },3000);

})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})