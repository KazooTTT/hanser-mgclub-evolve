// ==UserScript==
// @name         mgclub-evolve
// @namespace    https://github.com/KazooTTT/mgclub-evolve
// @version      0.0.1
// @author       KazooTTT
// @description  展示毛怪俱乐部每个帖子最新的回复时间
// @icon         https://github.com/kazoottt.png
// @match        https://2550505.com/
// ==/UserScript==

(function () {
  'use strict';

  const config = {
    // 接口url
    getPost: "https://2550505.com/post/list"
  };
  const getBottomSelectorByPostId = (id) => `.post-brief:has(.content .title[href="/postDetails/${id}"]) .top .post-user .bottom`;
  const getTopSelectorByPostId = (id) => `.post-brief:has(.content .title[href="/postDetails/${id}"]) .top`;
  function appendResultToDom(result) {
    let attrName;
    result == null ? void 0 : result.forEach((item) => {
      var _a;
      const { id, last_reply_time } = item;
      const topEle = document.querySelector(getTopSelectorByPostId(id));
      const bottomEle = document.querySelector(getBottomSelectorByPostId(id));
      if (!attrName) {
        attrName = ((_a = (bottomEle == null ? void 0 : bottomEle.childNodes[0]).attributes.item(0)) == null ? void 0 : _a.name) ?? "";
      }
      const lastReplyTimeElement = getSpanElement(last_reply_time, attrName);
      topEle == null ? void 0 : topEle.appendChild(lastReplyTimeElement);
    });
  }
  const handleResult = (result) => {
    const timer = setInterval(() => {
      const skeleton = document.querySelector(
        ".layout-post__main .posts  .post-skeleton"
      );
      if (!skeleton) {
        appendResultToDom(result);
        clearInterval(timer);
      }
    }, 1e3);
  };
  const getSpanElement = (lastReplyTime, attrName) => {
    const span = document.createElement("span");
    span.className = "post-time";
    span.innerText = lastReplyTime;
    span.style.alignSelf = "end";
    span.setAttribute(attrName, "");
    return span;
  };
  function interceptXHR() {
    XMLHttpRequest.prototype.originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
      const xhr = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.responseURL.startsWith(config.getPost)) {
            const response = JSON.parse(xhr.response);
            handleResult(response.result);
          }
        }
      };
      xhr.originalSend.apply(xhr, arguments);
    };
  }
  interceptXHR();

})();
