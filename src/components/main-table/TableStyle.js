import styled from "styled-components";

const ContainerStyles = styled.div`
    .table-container {
        background: #f1f1f1;
        .empty {
            display: flex;
            justify-content: center;
            padding: 20px;
        }
        .tools {
            display: flex;
            justify-content: space-between;
            margin: 25px;
            @media screen and (max-width: 1024px) {
                display: flex;
                flex-direction: column;
            }

            .btn-group {
                display: flex;
                margin: 5px;
                @media screen and (max-width: 1024px) {
                    justify-content: center;
                    margin-top: 0.8em;
                }
            }
            .wrapper {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                & label {
                  position: absolute;
                  margin-left: 10px;
                  color: #000000;
                  font-size: 14px;
                  font-family: 'Roboto';
                  transition: all .20s ease-in-out;
                }
                & input {
                  box-sizing: content-box;
                  height: 35px;
                  border-radius: 4px;
                  border: 1px solid #000000;
                  padding: 0 10px;
                  font-family: 'Roboto';
                  font-size: 14px;
                  outline: none;
                }
                & i {
                  position: absolute;
                  right: 14px;
                  color: #000000;
                  font-size: 24px;
                  opacity: .2;
                  transition: all .20s ease-in-out;
                }
                & input:valid {
                  background: rgba(255, 255, 255, 0.1);
                  color: #000000;
                }
                & input:focus {
                  border: 1px solid #000000;
                }
                & input:focus + label {
                  transform: translate(0, -35px);
                  color: #000000;
                }
                
                & input:valid + label {
                  transform: translate(0, -35px);
                  color: #000000;
                }
                
                & input:focus ~ i {
                  opacity: 1;
                  color: #000000;
                }
                
                & input:valid ~ i {
                  color: #000000;
                }
            }
        }
    
    
        .table {
            position: relative;
            width: 100%;
            height: 100%;
    
            .header {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: stretch;
                height: 50px;
                width: 100%;
                border-bottom: 1px solid #d3d3d3;        

                @media screen and (max-width: 1024px) {
                    flex-direction: column;
                    height: 50px;
                }

                    .hcol {
                        display: flex;
                        background-color: #e5e8eb;
                        border-color: #DFDFDF;
                        justify-content: center;
                        padding: 0 7px;
                        height: 50px;
                        align-items: center;
                        cursor: pointer;
                        color: #1F384D;
                        box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.5);
                        width: 100%;
                    }      
                }
    
                ul {
                    list-style: none;
                    padding: 0px;
                    margin: 0px;
                    position: absolute;
                    top: 52px;
                    width: 100%;
                    @media screen and (max-width: 1024px) {
                        top: 120px;
                    }

                    
                    li {
                        width: 100%;
                        min-height: 53px;
                        border-bottom: 1px solid #DFDFDF;
                        cursor: pointer;
                        @media screen and (max-width: 1024px) {
                            min-height: 120px;
                        }
                        
                        .heading {
                            display: flex;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: nowrap;
                            align-items: stretch;
                            width: 100%;
                            height: 53px;
                            @media screen and (max-width: 1024px) {
                                height: 200px;
                            }
                            transition: background 0.5s;
                            
                            @media screen and (max-width: 1024px) {
                                flex-direction: column;
                            }
                            .col {
                            display: flex;
                            align-items: center;
                            width: 100%;
                            padding: 0 10px;
                            height: 53px;
                            border-right: 1px solid #DFDFDF;
                            .btn-edit {
                                margin: 5px;
                                cursor: pointer;
                                position: relative;
                                background-color: #18b31e;
                                border: none;
                                color: #ffffff;
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
                            .btn-delete {
                                margin: 5px;
                                cursor: pointer;
                                position: relative;
                                color: #ffffff;
                                background-color: #ff4911;
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
                            
                            .btn-edit:hover {
                               background:#fff;
                               box-shadow:0px 2px 10px 5px #97B1BF;
                               color:#000;
                            }
                            
                            .btn-delete:hover {
                               background:#fff;
                               box-shadow:0px 2px 10px 5px #97B1BF;
                               color:#000;
                            }
                            
                            .btn-edit:after {
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
                            .btn-delete:after {
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
                            .btn-edit:active:after {
                                padding: 0;
                                margin: 0;
                                opacity: 1;
                                transition: 0s
                            }
                            .btn-delete:active:after {
                                padding: 0;
                                margin: 0;
                                opacity: 1;
                                transition: 0s
                            }
                        }
                    }
                    .content {
                        width: 100%;
                        height: 0px;
                        opacity:0;
                        transition: height 0.3s;
                    }
                    
                }
            
                li.open {
                    .heading {
                        background: #6b51a6;
                        color: #ffffff;
                        .col {
                            border: none;
                        }
                    }
                    .content {
                        height: 100px;
                        opacity: 1;
                        .content-table {
                            text-align: left;
                            margin-left: 50px;
                        }
                        
                    }
                    
                }
            }
        }
    }
`

export default ContainerStyles;