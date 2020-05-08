# Katana
KatanaJS: A Framework for the NodeJS Environment










                ================[ Dynamic Routing ]================
                
                    Psuedo URL Path Segmants  
                                
                            CODE_EXAMPLE: _____________________________________________________________________________
                                    
                                    this.dynamicUrlPaths = 
                                    {
                                        ":[FNAME]"  :   "(\\w)+(\\.)(\\w{1,7})", // https://regex101.com/r/yyVVlt/3/
                                        ":[VAR]"    :   "^[A-Z,a-z]+[A-Z,a-z,0-9]*[_]{0,1}[A-Z,a-z,0-9]+$" 
                                    };

                            ____________________________________________________________________________________________
                            END_EXAMPLE
                    
                    
                    
                    The psuedo pathnames have the following rules
                        * Must start with letter.
                        * Case insensitive, upper and lower cases are allowed.
                        * Numbers are allowed, but only after the first letter.
                        * A single UNDERSCORE ('_') is allowed, any more than one is not permited.
                        * Last char must be letter or number.
                    ------------------------------------------------------------------------
                    NOTE:   These rules can be changed by changing the regex above, but be
                        careful as you can break the framework changing the above 'Regular         
                        Expressions'. The rules are in place to make the URLs created via    
                        'Router Manifest' compatable with the different environments that
                        your app will be interacting with, such as various browsers, 
                        NodeJS, and other env involvment depends on what your app is. 
                        One should allways look ahead and consider 'RUNTIME'.