import React, { useState, Fragment } from "react";
import { Tag, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Label = props => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [indexInput, setIndexInput] = useState(-1);
  const [errorInput, setErrorInput] = useState(false);
  let { item } = props;

  /**
   *
   * @param {event} e 事件对象编辑
   */
  let handleInputChange = e => {
    setInputValue(e.target.value);
  };

  let handleClose = removedTag => {};

  /**
   * 错误校验
   */
  let showInput = () => {
    if (errorInput) {
      message.error("请输入正确的键值对");
      return false;
    }
    setInputVisible(true);
  };

  /**
   * 输入完成之后的 校验 + 传递数据给父组件 + 本组件数据初始化
   * @param {any} index 告诉父组件属于编辑,还是新添加内容
   */
  let handleInputConfirm = index => {
    if (errorInput) {
      message.error("请输入正确的键值对");
      return false;
    }
    const value = inputValue.indexOf("=");
    if (
      value === 0 ||
      value === inputValue.length - 1 ||
      inputValue.split("=").length - 1 !== 1
    ) {
      setErrorInput(true);
      return false;
    }
    props.save(inputValue, index);
    setInputVisible(false);
    setInputValue("");
    setIndexInput(-1);
    setErrorInput(false);
  };

  /**
   * 点击tag执行的方法
   * @param {string} indexInput 修改的的内容
   * @param {number} item 修改的初始值
   */
  let setIndexInputData = (indexInput, item) => {
    if (errorInput) {
      message.error("请输入正确的键值对");
      return false;
    }
    setIndexInput(indexInput);
    setInputValue(item);
  };

  return (
    <Fragment>
      {item.map((item, index) => {
        return indexInput === index ? (
          <Input
            type="text"
            size="small"
            style={{ width: 200 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => handleInputConfirm(index)}
            onPressEnter={() => handleInputConfirm(index)}
            key={index}
            className={errorInput ? "cuowu" : null}
            placeholder="请输入key=value 回车确认"
          />
        ) : (
          <Tag
            onClick={() => setIndexInputData(index, item)}
            key={index}
            closable
            onClose={() => handleClose(item)}
          >
            {item}
          </Tag>
        );
      })}
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 200 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="请输入key=value 回车确认"
          className={errorInput ? "cuowu" : null}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 添加
        </Tag>
      )}
    </Fragment>
  );
};

export default Label;
