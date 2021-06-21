import React from 'react'
import Graph from './Graph'

import testTemplate from './testTemplate'

const {filterData,tableTemplate,stateTemplate}=testTemplate

const AppGraph = () => {
    return (
        <div>
            <Graph
             lb={"myGraph"}
             filterData={filterData}
             barColor={"#FF6F61"}
             stateTemplate={stateTemplate}
             detailKey={"name"}
            />
        </div>
    )
}

export default AppGraph
/*

*/