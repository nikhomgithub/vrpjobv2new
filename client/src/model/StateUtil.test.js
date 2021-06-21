import React from 'react'
import {fireEvent, render, cleanup} from '@testing-library/react'
import StateUtil from './StateUtil.js'
import StateTemplate from './StateTemplate'
const {
    dateNow,combineLoadDataBlankState,
    genBlankState,genRefAndValue,
    revRefAndValue,findEmptyArrayInData,
    convertFilterDataToGraphData
} = StateUtil

const {
    shopSignUpState,shopLogInState,shopChangePasswordState,
    addUserState,logInState,changePasswordState,
    partnerState,partnerGroupState,
    groupState,productState,
    basicDataState,routeAuthState,
    jobState,transactionState,transactionGroupState,
    transactionLogState
} = StateTemplate


describe('ListView no prop', ()=>{
    
    it('knows that 2 and 2 make 4', () => {
        const a=2+2
        const b=2+2
        expect(a).toBe(4);        
        expect(b).toBe(4);
    });

    it('genBlankState',()=>{
        let temp =genBlankState({template:productState})
        console.log(temp)
    })
})