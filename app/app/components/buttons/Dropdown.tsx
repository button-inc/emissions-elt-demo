import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

export interface IDropdownItem {
  title?: string;
  href?: string;
}

interface DropdownProps {
  items: Array<IDropdownItem>;
  dropdownName: string;
}

interface ItemProps {
  item: IDropdownItem;
}

const DropdownSeparator = () => {
  return <hr className="dropdown-divider" />;
};

const Dropdown: React.FC<DropdownProps> = ({ items, dropdownName }) => {
  const [open, setOpen] = useState(false);
  const DropdownLink: React.FC<ItemProps> = ({ item }) => {
    return (
      <>
        <a
          className="dropdown-item"
          href={item.href}
          onClick={() => setOpen(!open)}
        >
          {item.title}
        </a>
        <DropdownSeparator />
      </>
    );
  };

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          open == true && setOpen(!open);
        }}
      >
        <div className={"dropdown dropleft " + (open ? "show" : "")}>
          <a
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setOpen(!open)}
          >
            {dropdownName}
          </a>
          <div
            className={"dropdown-menu " + (open ? "show" : "")}
            aria-labelledby="dropdownMenuButton"
          >
            {items.length > 0 &&
              items.map((item, index) => {
                return <DropdownLink item={item} key={index} />;
              })}
          </div>
        </div>
      </OutsideClickHandler>
      <style jsx>
        {`
          .dropdown {
            position: relative;
          }
          .dropdown-toggle {
            @include caret;
          }
          .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            display: none;
            float: left;
            min-width: 10rem;
            padding-top: 0.5rem;
            padding-right: 0px;
            padding-bottom: 0.5rem;
            padding-left: 0.125rem;
            margin: 0.125rem 0 0;
            font-size: 1rem;
            color: #212529;
            text-align: left;
            list-style: none;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 0.25rem;
          }
          .dropleft .dropdown-menu {
            margin-top: 0;
            margin-right: 0.125rem;
            position: absolute;
            transform: translate3d(-109px, 0px, 0px);
            top: 0px;
            left: 0px;
            will-change: transform;
          }

          .dropdown-item {
            display: block;
            width: 100%;
            font-size: 1em;
            font-weight: bold;
            clear: both;
            font-weight: 400;
            color: #212529;
            text-align: inherit;
            white-space: nowrap;
            background-color: transparent;
            border: 0;
          }
          .dropdown-menu.show {
            display: block;
          }
          .btn {
            margin-left: 7px;
          }
          .btn-secondary {
            color: #fff;
            background-color: #6c757d;
            border-color: #6c757d;
          }
          .btn:not(:disabled):not(.disabled) {
            cursor: pointer;
          }
          .show > .btn-secondary.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.2rem rgb(108 117 125 / 50%);
          }
          .btn-secondary:hover {
            color: #fff;
            background-color: #5a6268;
            border-color: #545b62;
          }
          .btn-secondary:not(:disabled):not(.disabled).active,
          .btn-secondary:not(:disabled):not(.disabled):active,
          .show > .btn-secondary.dropdown-toggle {
            color: #fff;
            background-color: #545b62;
            border-color: #4e555b;
          }
        `}
      </style>
    </>
  );
};
export default Dropdown;
