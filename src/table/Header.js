import React, {useState, useEffect} from "react";
import {usePopper} from "react-popper";
import {grey} from "./colors";
import ArrowUpIcon from "./img/ArrowUp";
import ArrowDownIcon from "./img/ArrowDown";
import TextIcon from "./Text";
import MultiIcon from "./img/Multi";
import HashIcon from "./img/Hash";
import {shortId} from "./utils";

export default function Header({
  column: {id, created, label, dataType, getResizerProps, getHeaderProps},
  setSortBy,
  dataDispatch
}) {
  const [expanded, setExpanded] = useState(created || false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [inputRef, setInputRef] = useState(null);
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    strategy: "absolute"
  });
  const [header, setHeader] = useState(label);
  const buttons = [
    {
      onClick: (e) => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        setSortBy([{id: id, desc: false}]);
        setExpanded(false);
      },
      icon: <ArrowUpIcon />,
      label: "Sort ascending"
    },
    {
      onClick: (e) => {
        dataDispatch({type: "update_column_header", columnId: id, label: header});
        setSortBy([{id: id, desc: true}]);
        setExpanded(false);
      },
      icon: <ArrowDownIcon />,
      label: "Sort descending"
    }
  ];

  let propertyIcon;
  switch (dataType) {
    case "date":
      propertyIcon = <HashIcon />;
      break;
    case "text":
      propertyIcon = <TextIcon />;
      break;
    case "select":
      propertyIcon = <MultiIcon />;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (created) {
      setExpanded(true);
    }
  }, [created]);

  useEffect(() => {
    setHeader(label);
  }, [label]);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  return <>
      <div {...getHeaderProps({style: {display: "inline-block"}})} className='th noselect'>
        <div className='th-content' onClick={() => setExpanded(true)} ref={setReferenceElement}>
          <span className='svg-icon svg-gray icon-margin'>{propertyIcon}</span>
          {label}
        </div>
        <div {...getResizerProps()} className='resizer' />
      </div>
      {expanded && <div className='overlay' onClick={() => setExpanded(false)} />}
      {expanded && (
        <div ref={setPopperElement} style={{...styles.popper, zIndex: 3}} {...attributes.popper}>
          <div
            className='bg-white shadow-5 border-radius-md'
            style={{
              width: 240
            }}>
            
            <div
              key={shortId()}
              style={{
                borderTop: `2px solid ${grey(200)}`,
                padding: "4px 0px"
              }}>
              {buttons.map((button) => (
                <button type='button' className='sort-button' onMouseDown={button.onClick}>
                  <span className='svg-icon svg-text icon-margin'>{button.icon}</span>
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
}
