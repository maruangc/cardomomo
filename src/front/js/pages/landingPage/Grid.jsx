import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import Aos from "aos";
import "aos/dist/aos.css";

const Grid = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, easing: "ease-in-sine" });
  });
  return (
    <div className="flex justify-content-center items-center">
      <div className=" grid py-8 mx-8">
        <div className="first part col-12 md:col-6 ">
          <h1 className="text-black-alpha-90 text-4xl font-bold">
            Welcome to Landing Page
          </h1>
          <div className="mb-3 w-10 shadow-8 ">
            <TabView>
              <TabPanel header="Header I">
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </TabPanel>
              <TabPanel header="Header II">
                <p className="m-0">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Consectetur, adipisci velit, sed quia non numquam
                  eius modi.
                </p>
              </TabPanel>
              <TabPanel header="Header III">
                <p className="m-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus.
                </p>
              </TabPanel>
              <TabPanel header="Header IV">
                <p className="m-0">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus.
                </p>
              </TabPanel>
            </TabView>
          </div>
          <div>
            <Button
              label="Get Started"
              className="w-10rem h-3rem mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border-blue-500 px-4"
            >
              <i className="fa-solid fa-arrow-right"></i>
              <Ripple />
            </Button>
          </div>
        </div>
        <div className="second part col-12 md:col-6 ">
          <div data-aos="zoom-in ">
            <Card className="shadow-8 w-11 m-1">
              <Image
                className="w-full h-full"
                src="https://images.pexels.com/photos/7567554/pexels-photo-7567554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Image"
                width="100%"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
