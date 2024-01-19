export const Forms = () =>
{

  const printHi = () => console.log("Hello");
  return(
    <div>
      <label htmlFor="email">Email: </label>
      <input id="email" type="text" placeholder="Email...."/>
      <input type="submit" onClick={printHi} defaultValue="Submit"/>
    </div>
  )
}