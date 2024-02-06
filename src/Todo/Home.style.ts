import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface IHomeStyle{
    todoContainer:IStyle;
    headerStyle:IStyle;
    pivotRoot:IStyle;
    pivotContainer:IStyle;
}
const HomeStyle:IProcessedStyleSet<IHomeStyle>=mergeStyleSets({
    todoContainer:{
        width:"50%",
        height:"80%",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        //container css,in json it should be camel case and should be string 
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
    headerStyle:{
        height:80,
        backgroundColor:"cadetblue",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"white",
    },
    pivotRoot:{
        display:"flex",
        justifyContent:"center"
    },
    pivotContainer:{
        margin:20,
    }
})




export default HomeStyle;