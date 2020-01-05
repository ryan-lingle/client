import React, { useState } from "react";

const Tabs = ({ tabs, onChange, _default, pluralize }) => {
  const [current, setCurrent] = useState(_default || tabs[0]);

  return(
    <div id="search-tabs">
      {tabs.map((tab, i) => {
        const isCurrent = current === tab;
        return(
          <span
            key={i}
            onClick={() => {
              setCurrent(tab);
              onChange(tab);
            }}
            className={`search-tab ${isCurrent ? 'current-search-tab' : null}`}
            id={`${tab}-search-tab`}
          >
            {tab}{pluralize ? "s" : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Tabs;
