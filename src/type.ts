let x :boolean = true
let c :boolean | number = true
let y : string = "Nasirulla"
let z :number =4567890

let d :any = "yhjkml"

let arr :number[] = [1,2,3,4,5,5]
let brr :string[] = ["nasirulla","raaz","nasir","nasi","munna"]
let numStrArr  :(number | string)[]= [1,2,3,"nasirulla"]


let tuple1 :[string , string , string] =["string","string","string"]
let tuple2 :[string , number , string] =["string",1,"string"]

let a :10 | 20       = 20 // means only 10 aand 20 can assing in this value 
// let a :10 | 20 | "nasirulla"       = "nasirulla" // its can be astring also if we assign 

const obj :{
    name:string,
    age:number
    collage?:string } =

{

    name:"nasirulla",
    age:18
}