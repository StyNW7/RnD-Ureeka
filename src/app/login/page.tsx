const LoginPage: React.FC = () => {
    return (
      <>
        <h1>Login page</h1>
        <br />
        <ol className="h-[200vh]">
          <li>User harus login untuk bisa ke page apapun</li>
          <li>Bisa akses landing page sebelum ke login page</li>
          <li>Redirect user apabila dari page lain sebelom login</li>
        </ol>
      </>
    );
  };
  
  export default LoginPage;