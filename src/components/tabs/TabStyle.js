import styled from "styled-components";

const TabStyle = styled.div`
    .container {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 90%;
        // height: 300px;
        background: #f1f1f1;
        margin: 50px auto 0;
        word-break: break-all;
        // border: 1px solid rgba(0, 0, 0, 0.274);
    }
  
    .bloc-tabs {
        display: flex;
        width: 500px;
    }
    .tabs {
        padding: 15px;
        text-align: center;
        width: 20%;
        background: rgba(128, 128, 128, 0.075);
        font-size: 16px;
        cursor: pointer;
        border-bottom: 1px solid rgba(0, 0, 0, 0.274);
        box-sizing: content-box;
        position: relative;
        outline: none;
    }
    .tabs:not(:last-child){
        border-right: 1px solid rgba(0, 0, 0, 0.274);
    }
    
    .active-tabs  {
        background: white;
        border-bottom: 1px solid transparent;
    }
    
    .active-tabs::before {
        content: "";
        display: block;
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% + 2px);
        height: 5px;
        background: #392b58;
    }
    
    button {
        border: none;
    }
    .content-tabs {
        flex-grow : 1;
    }
    .content-tab {
        background: white;
        height: 100%;
        display: none;
    }
    .content-tab h2 {
        padding: 0px 0 5px 0px;
    }
    .content-tab hr {
        width: 100px;
        height: 2px;
        background: #222;
        margin-bottom: 5px;
    }
    .content-tab p {
        width: 100%;
        height: 100%;
    }
    .active-content {
        display: block;
    }
`

export default TabStyle;