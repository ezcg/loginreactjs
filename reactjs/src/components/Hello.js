import React from 'react'

function Hello() {

  return (<><div><p style={{color:"green"}}>To get started, sign in with Google above.</p>
    <p>If this is your first time running this, initilize the database by running in a shell terminal on the HOST:</p>
    <p>docker exec -it db bash -c "bash /mysql/docker_init_mysql.sh"</p></div></>)

}

export default Hello

