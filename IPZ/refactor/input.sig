1. <signal-program> --> <program>
2. <program> --> PROGRAM <procedure-identifier>;
          <block>.
3.  <block> --> <declarations> BEGIN <statements-list> END
4.  <declarations> --> <label-declarations>
5.  <label declarations> --> LABEL <unsigned-integer> <labels-list>; | <empty>
6.  <labels-list> --> , <unsigned-integer> <labels-list> | <empty>
7.  <statements list> --> <statement> <statements-list> | <empty>
8.  <statement> --> <unsigned-integer> : <statement>
                    |
                    GOTO <unsigned-integer>; |
                    <condition-statement> ENDIF; |
                    ;
9.  <condition-statement> --> <incomplite-condition-statement><alternative-part>
10. <incomplite-condition-statement> --> IF
                    <condition-expression> THEN
                    <statement-list>
11. <condition-expression> --> <variable-identifier> = <unsigned-integer>                                      
12. <alternative-part> --> ELSE <statements-list> | <empty>
13. <variable-identifier> --> <identifier>
14. <procedure-identifier> --> <identifier>
15. <identifier> --> <letter><string>
16. <string> --> <letter><string> |
                <digit><string>  |
                <empty>
17. <unsigned-integer> --> <digit><digits-string>
18. <digits-string> --> <digit><digits-string>
19. <digit> --> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
20. <letter> --> A | B | C | D | E | ... | Z       