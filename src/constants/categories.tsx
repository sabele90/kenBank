import {
    FaShoppingCart,
    FaUtensils,
    FaHospital,
    FaBus,
    FaHome,
    FaMoneyBillWave,
    FaGift,
    FaBolt,
    FaGraduationCap,
    FaQuestionCircle
  } from 'react-icons/fa';
  
  export const categories = [
    {
      id: 1,
      name: 'Shopping',
      keywords: ['shop', 'shopping', 'store', 'buy'],
      icon: <FaShoppingCart />,
      color: 'pink',
    },
    {
      id: 2,
      name: 'Food',
      keywords: ['food', 'restaurant', 'dinner', 'meal'],
      icon: <FaUtensils />,
      color: 'orange',
    },
    {
      id: 3,
      name: 'Health',
      keywords: ['health', 'doctor', 'hospital', 'medicine'],
      icon: <FaHospital />,
      color: 'red',
    },
    {
      id: 4,
      name: 'Transport',
      keywords: ['transport', 'bus', 'train', 'taxi'],
      icon: <FaBus />,
      color: 'blue',
    },
    {
      id: 5,
      name: 'Housing',
      keywords: ['house', 'rent', 'mortgage', 'apartment'],
      icon: <FaHome />,
      color: 'cyan',
    },
    {
      id: 6,
      name: 'Income',
      keywords: ['salary', 'income', 'deposit', 'pay'],
      icon: <FaMoneyBillWave />,
      color: 'green',
    },
    {
      id: 7,
      name: 'Gift',
      keywords: ['gift', 'present', 'surprise'],
      icon: <FaGift />,
      color: 'purple',
    },
    {
      id: 8,
      name: 'Utilities',
      keywords: ['electricity', 'water', 'gas', 'bill'],
      icon: <FaBolt />,
      color: 'teal',
    },
    {
      id: 9,
      name: 'Education',
      keywords: ['school', 'education', 'books', 'tuition'],
      icon: <FaGraduationCap />,
      color: 'yellow',
    },
    {
        id: 10,
        name: "Other",
        keywords: [],
        icon: <FaQuestionCircle />,
        color: "gray",
      }
    
  ];
  