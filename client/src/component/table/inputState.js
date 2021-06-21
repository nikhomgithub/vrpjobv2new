const productInputState=
{
    id:     {toCheck:false,min:0,max:0},
    barcode:{toCheck:false,value:""},
    name:   {toCheck:false,value:""},
    groupId:{toCheck:false,min:0,max:0},
    groupName:{toCheck:false,value:""},
    unit:   {toCheck:false,value:""},
    price:  {toCheck:false,min:0,max:0},
    stock:{toCheck:false,min:0,max:0},
    order:{toCheck:false,min:0,max:0},
    plan:{toCheck:false,min:0,max:0},
    isRawMat:   {toCheck:false,value:false},
    remark: {toCheck:false,value:""},
  }

const partnerInputState={
    id:{toCheck:false,min:0,max:0},
    title:{toCheck:false,value:""},
    name:{toCheck:false,value:""},
    phone:{toCheck:false,value:""},
    partnerType:{toCheck:false,value:""},
    remark:{toCheck:false,value:""},
    address_number:{toCheck:false,value:""},
    address_tambon:{toCheck:false,value:""},
    address_district:{toCheck:false,value:""},
    address_province:{toCheck:false,value:""},
    address_postcode:{toCheck:false,value:""},
  }


const transactionInputState={
  id:{toCheck:false,min:0,max:0},
  date:{toCheck:false,min:"2018-01-01",max:new Date().toISOString()},
  groupId:{toCheck:false,min:0,max:0},
  groupName:{toCheck:false,value:""},
  
  //transactionStatus:{toCheck:false,value:""},
  //transactionType:{toCheck:false,value:""},
  //effectStock:{toCheck:false,value:""},
  //effectOrder:{toCheck:false,value:""},              

  partnerId:{toCheck:false,min:0,max:0},
  title:{toCheck:false,value:""},
  name:{toCheck:false,value:""},
  phone:{toCheck:false,value:""},

  remark:{toCheck:false,value:""},
  address_number:{toCheck:false,value:""},
  address_tambon:{toCheck:false,value:""},
  address_district:{toCheck:false,value:""},
  address_province:{toCheck:false,value:""},
  address_postcode:{toCheck:false,value:""},

  total:{toCheck:false,min:0,max:0},
  reduction:{toCheck:false,min:0,max:0},
  grandTotal:{toCheck:false,min:0,max:0},

  detail_id:     {toCheck:false,min:0,max:0},
  detail_barcode:{toCheck:false,value:""},
  detail_name:   {toCheck:false,value:""},
  detail_groupId:{toCheck:false,min:0,max:0},
  detail_groupName:{toCheck:false,value:""},
  detail_unit:   {toCheck:false,value:""},
  detail_isRawMat:   {toCheck:false,value:false},

  detail_price:  {toCheck:false,min:0,max:0},
  detail_quantity: {toCheck:false,min:0,max:0},
  detail_result: {toCheck:false,min:0,max:0},
  detail_remark: {toCheck:false,value:""},

}

const transactionLogInputState={
  status:{toCheck:false,value:""},
  ...transactionInputState,
}

const inputState = {
    productInputState,
    partnerInputState,
    transactionInputState,
    transactionLogInputState
}

export default inputState
