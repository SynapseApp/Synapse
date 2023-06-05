
const LoginComponent = () => {
  return (
    <>
      <div className="bg-[#121418] flex justify-center items-center flex-col w-[100%] h-[100%] pt-[1vh] pb-[2vh]">

        <div className="w-[50%] h-[80vh] bg-[#121418]	pt-[2vh]">

          <h1 className="font-mono text-white text-7xl pt-[0] pb-[2vw] text-center font-bold">Welcome To Synapse</h1>
          <br />
          <p className="font-mono text-white text-center text-4xl font-medium">Login to your account</p>
          <br />


          <form className="flex flex-col justify-center items-center gap-[5vh] h-[55vh] bg-[#121418]">

            <div className="gradient-border-all flex justify-center items-center">
              <button type="submit" className="flex items-center text-center text-white h-[6vh] w-[19vw] pb-[1vh] pt-[1vh] font-mono font-medium text-2xl">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAuZJREFUaEPtWYFRFEEQnI5AzQAjUCKQDMQIhAiECMAIxAjECNQIlAggAyQCIIKmWveqrvB2Znbv3vetn6qv+vrb2+2eme2d2YdtuGHD8duWwLojuI3AfxUBkq/N7KWZ7RViO2Z2Vz766YeZfQNwtRTx2SlEUmDfmdl+AyiR+mpm7wH8bHjvj6HdBArwk5G3e3GczyHSRYDkBzM76kU88Z4icghAUWmyJgIkn5rZp8Z0aQH0ppVEmkAB/71s0hZQ2bGfARxkBw/jWgh8WaHnu8CLRIoAybOiNFkH3ZiZpHIsl1KrVxMTdINPEShqo9SJ7N7MTgGI7KSVNNTm1+eJmc0CnyUg8MPBVMN2YWYHWU0nqQNO408jr0TP3RRKev/Y83oEYO7ziIB0WeVBzWanwMoIlHy9dRa4AaBUWKtVI0BStY2ks2Y6OVUGrNU8AgL3toLuHoBO5dBITkln+N5ogCJdLfg8Aip9a4unc58kW9BOjL0AUFXBXgIqg1MSuACBKwC7NSd4BDzPpaVzAQIGoIrTI6ASV6fllG0EAW8P/M0UWskeUF+baiEXSKFuAp6M3gF4llEXkpnNXqtUtYTrrH/iICN56TRK7n6LaiFPiXS47ALQZu+2UpleOxM87zrINCHJqJg7B3DYjf73Gl6nF9ZbUQSUm1Ez002CpBob3XDU7CMA9/YjbClJenI6LKzWUcVd+sYtcTWjDm8nStEMAV0VapNlTIqjOmmy+ColuvoLjYtK8dRZExIoeyEK9WNy2thDU6/vqlzHd6aRM1Le1yQpAoWEdy5EgFqeC/xeNh1bCMiL2g8vWtB0jG1qlNIEBiAkVxUJef6otctrJtC5J6JA6CJsP5s248m6CBQSUhGpSa3tjEDrubyui7CzSC5rk3UTGKWU1EUqpeq01j88Xl8eVyp2Ax8mnE1gjIykyIjIIJvjxxKAX//MZG/wMiFclEBmwaXHbAks7dHW+bYRaPXY0uM3PgIPBNkfQJ3xU2oAAAAASUVORK5CYII=" />
                Log in with Google
              </button>

            </div>

            <input className="font-mono h-[15vh] w-[19vw] rounded-lg pl-[2vh] text-xl bg-neutral-700 font-thin" type="text" placeholder="Email or Username" />

            <input className="font-mono h-[15vh] w-[19vw] rounded-lg pl-[2vh] text-xl bg-neutral-700 font-thin focus:border-0 focus:bg-black focus:text-white" type="password" placeholder="Enter Your Password" />

            <a href="#" className="font-mono text-2xl text-white border-b border-solid gradient-border">Forgot Password?</a>

            <button type="submit" className="gradient-btn flex items-center justify-around gap-[2.5vw] pr-[0.8vw] text-2xl text-left h-[20vh] w-[18.98vw] font-mono font-[550] h-[8vh] w-[30vw] rounded-lg pl-[1vw] rounded-lg">Log To Your Account <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
            </button>

            <p className="pb-[1vh] mt-[5vh] font-mono text-2xl font-thin text-white">Don't have an account? <a href="#" className="font-bold">Sign Up</a></p>

          </form>

        </div>

        <p className="text-xl mt-[10vh] mb-[1vh] text-white">Copyright@Synapse 2023</p>
      </div>
    </>
  )
}

export default LoginComponent
