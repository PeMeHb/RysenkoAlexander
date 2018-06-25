export const Tablink = ({ title, index, select }) => {
  const onClick = (e) => {
    select(index);
    /*
    * (function select(id) {
      this.setState({ id });
    })(index)
    *
    * */
    e.preventDefault();
  };
  return (
    <a
      href="#"
      onClick={onClick}
    >
      {title}
    </a>
  );
};
