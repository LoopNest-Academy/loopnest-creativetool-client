import logo from "../../../../public/logo.png"

const Home = () => {
  return (
    <div
      style={{
        marginTop: "12%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        className="logo"
        style={{
          width: "130px",
          borderRadius: "50%",
        }}
        src={logo}
        alt=""
      />

      <h1 className="text-4xl">Creative-toolKit — @ettisafxrup</h1>
      <strong>
        {localStorage.getItem("moderator")} - {localStorage.getItem("role")},
        LoopNest
      </strong>
    </div>
  )
}
export default Home
