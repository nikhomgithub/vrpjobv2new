const patternNumber = /^\d{1,30}$/gi
const patternString = /^[ก-๙\w\+\-\*\/\\.=]{1,200}$/gi
const patternEmail = /^[\w@\.\-]{1,30}$/gi
const patternDate = /^\d{4}-\d{2}-\d{2}$/gi
const patternFileName = /^[\w\-\*\/\.\\=]{1,200}$/gi
const patternBoolean = /^(true)|(false)$/gi
const patternWildCard = /.{0,200}/gi
//const patternNumber=/^(\d{1,30})|(\d{1,15}\.\d{1,15})|(\d{1,29}.)$/gi

const valBasic = (pttn, str) => {
    return new RegExp(pttn).test(str)
}

const valArray = (pttn, array) => {
    let tempResult = true

    for (let i = 0; i < array.length; i++) {
        tempResult = new RegExp(pttn).test(array[i])
        if (!tempResult) {
            break
        }
    }
    return tempResult
}
const valNone = () => {
    return true
}

const testState = {
    id: { stType: "string", validate: valBasic, pattern: patternNumber },
    date: { stType: "number", validate: valBasic, pattern: patternDate },
    name: { stType: "string", validate: valBasic, pattern: patternString },

    total: { stType: "number", validate: valBasic, pattern: patternNumber },
    phone: { stType: "array", validate: valArray, pattern: patternNumber },
    isRawMat: { stType: "boolean", validate: valBasic, pattern: patternBoolean, stDefault: true },

    address: {
        stType: "arrayObject", stChildren: {
            number: { stType: "string", validate: valBasic, pattern: patternString },
            tambon: { stType: "string", validate: valBasic, pattern: patternString },
            district: { stType: "string", validate: valBasic, pattern: patternString },
            province: { stType: "string", validate: valBasic, pattern: patternString },
            postcode: { stType: "string", validate: valBasic, pattern: patternString },
        }
    },

    file1: { stType: "file", validate: valNone, pattern: null },
    photoUrl1: { stType: "array", validate: valArray, patternFileName },
}
//====================================
const testData = [
    {
        id: 1, date: "2021-04-13", name: "aaa", total: 100, phone: ["1234", "5678"], isRawMat: true,
        address: [
            { number: 1, tambon: "ท่านัด", district: "ดำเนิน", province: "ราชบุรี", postcode: "70130" },
            { number: 2, tambon: "หลักห้า", district: "บ้านแพ้ว", province: "ราชบุรี", postcode: "24120" },
        ],
        photoUrl1: [
            "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
        ],
    },
    {
        id: 2, date: "2021-05-15", name: "bbb", total: 200, phone: ["1111", "2222"], isRawMat: true,
        address: [
            { number: 1, tambon: "ท่านัด", district: "ดำเนิน", province: "ราชบุรี", postcode: "70130" },
        ],
        photoUrl1: [
            "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80"
        ],
    },
    {
        id: 3, date: "2021-06-21", name: "ccc", total: 300, phone: ["3434", "4444"], isRawMat: false,
        address: [
            { number: 1, tambon: "ท่านัด", district: "ดำเนิน", province: "ราชบุรี", postcode: "70130" },
        ],
        photoUrl1: [
            "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80" ,
            "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1353&q=80"
        ]
    },

]

//=============================
const testTable = {

    id:         //1
    {
        lb: 'ID', type: "number",
        width: 40, showCol: true, showColHead: true,
    },
    date:        //2
    {
        lb: 'วันที่', type: "date",
        width: 90, showCol: true, showColHead: true,
    },
    name:             //3
    {
        lb: 'ชื่อ', type: "string",
        width: 100, showCol: true, showColHead: true,
    },
    total:      //4
    {
        lb: 'รวม', type: "number",
        width: 70, showCol: true, showColHead: true, showSum: true
    },
    phone:         //5
    {
        lb: 'โทรศัพท์', type: "array",
        width: 110, showCol: true, showColHead: true,
    },
    isRawMat:         //6
    {
        lb: 'เป็นวัตถุดิบ', type: "boolean",
        width: 60, showCol: true, showColHead: true,
    },
    address:         //7
    {
        lb: 'ที่อยู่', type: "arrayObject",
        width: 200, showCol: true, showColHead: true,
        children: {
            number: { lb: "เลขที่" },
            tambon: { lb: "ตำบล" },
            district: { lb: "อำเภอ" },
            province: { lb: "จังหวัด" },
            postcode: { lb: "รหัสไปรษณีย์" }
        }
    },
    photoUrl1:
    {
        lb: 'รูป', type: "arrayPhoto",
        width: 200, showCol: true, showColHead: true,
    },
}



const testTemplate = {
    testTable, testData, testState
}

export default testTemplate
