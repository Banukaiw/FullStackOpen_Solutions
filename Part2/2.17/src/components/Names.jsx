const Names=({person, deleteName})=>{
    return(
    <div>
    {person.name} {person.number} <button onClick={()=> deleteName(person.id)}> delete</button>
    </div>
    );
    
}

export default Names
