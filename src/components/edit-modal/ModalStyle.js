
import styled from "styled-components";

const ModalStyle = styled.div`
    .modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }
    
    /* Modal Content */
    .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 30%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }
    
    /* Add Animation */
    @-webkit-keyframes animatetop {
        from {top:-300px; opacity:0} 
        to {top:0; opacity:1}
    }
    
    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }
    
    /* The Close Button */
    .close {
        color: white;
        float: right;
        font-size: 22px;
        font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    .modal-header {
        padding: 2px 16px;
        background-color: #DFDFDF;
        color: white;

        h3 {
            color: #000000
        }
    }
    .modal-body { 
        padding: 16px 16px;
        textarea {
            resize: vertical;
            width: 100%;
            height: 120px;
            -moz-border-bottom-colors: none;
            -moz-border-left-colors: none;
            -moz-border-right-colors: none;
            -moz-border-top-colors: none;
            background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
            border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
            border-image: none;
            border-radius: 6px 6px 6px 6px;
            border-style: none solid solid none;
            border-width: medium 1px 1px medium;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
            color: #555555;
            font-family: 'Roboto';
            font-size: 14px;
            line-height: 1.4em;
            transition: background-color 0.2s ease 0s;
          }
          
          textarea:focus {
              background: none repeat scroll 0 0 #FFFFFF;
              outline-width: 0;
          }
    }
    
    .modal-footer {
        padding: 2px 16px;
        text-align: right;
        background-color: #DFDFDF;
        color: white;
        .btn-ok,
        .btn-cancel {
            margin: 5px;
            cursor: pointer;
            position: relative;
            background-color: #a37ff6;
            border: none;
            padding: 10px;
            border-radius: 2px;
            width: 80px;
            font-size: 14px;
            text-align: center;
            -webkit-transition-duration: 0.4s; /* Safari */
            transition-duration: 0.4s;
            text-decoration: none;
            overflow: hidden;
        }
        .btn-ok:hover, 
        .btn-cancel:hover{
            background:#fff;
            box-shadow:0px 2px 10px 5px #97B1BF;
            color:#000;
        }
        .btn-ok:after,
        .btn-cancel:after{
            content: "";
            background: #ddf80f;
            display: block;
            position: absolute;
            padding-top: 300%;
            padding-left: 350%;
            margin-left: -20px !important;
            margin-top: -120%;
            opacity: 0;
            transition: all 0.8s
        }
        .btn-ok:active:after,
        .btn-cancel:active:after{
            padding: 0;
            margin: 0;
            opacity: 1;
            transition: 0s
        }
    }
`;

export default ModalStyle;