import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [items, setItem] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://200.69.21.39:8081/restaurants/3908641457831936/menu-items/1/5"
        );
        // console.log(res.data);
        // console.log(res.data.body[1].menuItemPage.menuItems);
        setItem(res.data.body);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const recommend = ["coffee", "chicken"];

  return (
    <>
      <div className="container-fluid">
        <div className="search py-3">
          <div className="form">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search anything..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </div>
          <div className="recommend">
            {recommend.map((value, index) => {
              return (
                <div className="m-2" key={index}>
                  <div
                    className="card"
                    onClick={() => setSearch(value === "all" ? "" : value)}
                  >
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="category">
          <span>All</span>
          {items.map((value, index) => {
            return (
              <>
                <span>{value.name}</span>
              </>
            );
          })}
        </div>
        <div className="row">
          {items[1]?.menuItemPage.menuItems
            .filter(
              (data) =>
                data.item.name.toLowerCase().includes(search || "") ||
                data.item.name.toLowerCase().includes(search || "")
            )
            .map((value, index) => {
              return (
                <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
                  <div className="card m-2 text-start">
                    <img
                      className="card-img-top"
                      src={value.item.imageUrl || "assets/burger.jpg"}
                      alt="Title"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {value.item.name.length >= 25
                          ? value.item.name.replaceAll("#", " ").slice(0, 25) +
                            "..."
                          : value.item.name.replaceAll("#", " ")}
                      </h5>
                      <h6 className="text-muted">
                        {value.item.itemCategory.name}
                      </h6>
                      <p className="card-text">{value.item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
