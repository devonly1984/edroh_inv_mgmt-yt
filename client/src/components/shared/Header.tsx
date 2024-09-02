const Header = ({title}:{title:string}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 px-7 pt-5">{title}</h2>
      <hr />
    </div>
  );
}
export default Header