import React from 'react';
import { FaBed, FaChair, FaCouch, FaLaptop, FaMobileAlt, FaTv } from 'react-icons/fa';

const CategoryCard = ({category}) => {
    return (
      <div className='text-center' style={{marginRight: '29px', width: "12rem" }}>
          <img className='d-block w-100' style={{borderRadius: "16px", overflow: 'hidden', opacity: 1, height: "8rem", objectFit: "cover"}} src={category.imageLink}></img>
          <p className='mt-2'>{category.name}</p>
      </div>
    );
}
 
class Categories extends React.Component {
    render() { 
        return <div className='d-flex justify-content-center pt-4 pb-4'>
            <CategoryCard key={0} category={{name: 'Bedroom', imageLink: 'https://images.unsplash.com/photo-1585821569331-f071db2abd8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}} />
            <CategoryCard key={1} category={{name: 'Living Room', imageLink: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80'}} />
            <CategoryCard key={2}category={{name: 'Work From Home', imageLink: 'https://images.unsplash.com/photo-1492138786289-d35ea832da43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}} />
            <CategoryCard key={3}category={{name: 'Kitchen', imageLink: 'https://images.unsplash.com/photo-1628843226223-989e20810393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'}} />
        </div>;
    }
}
 
export default Categories;