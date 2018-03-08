(setq first '(a b c d))
(setq second '(m n d))
(setq third '(f e a a a a))



(defun createSet(sets)
 (setq buffer '())
 (loop for set in sets
  do (loop for item in set
      do (if (not(member item buffer))
          (push item buffer))))
 (return-from createSet buffer))
 
 

(defvar sets (list first second third)) 
(defvar result (createSet sets))
(print result)
    