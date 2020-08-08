const MenuItem = ({ children, href }) =>
  <a href={href} class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 hover:underline">
    {children}
  </a>

function Header ({ user, loading }) {
  return (
    <>
      {loading && <p>Loading login info...</p>}
      {user && (
        <>
          <header style={{backgroundColor:'#2F6A8F'}}>
            <nav class="flex items-center justify-between flex-wrap p-6">
              <div class="flex items-center flex-shrink-0 text-white mr-6">
                <img class="fill-current w-8 mr-2"  src='/logo.png'></img>
                <a href='/'>
                  <span class="font-semibold text-xl tracking-tight">
                    Friender
                  </span>
                </a>
              </div>
              <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">
                  <MenuItem href=''>Show My QR</MenuItem>
                  <MenuItem href=''>Add A Friend</MenuItem>
                </div>
                <div>
                  <a href="/api/logout" class="inline-block text-sm px-4 py-2 leading-none 
                        border rounded text-white border-white mt-4 lg:mt-0">
                    Logout
                  </a>
                </div>
              </div>
            </nav>
          </header>
        </>)}
    </>
    
  )
}

export default Header
