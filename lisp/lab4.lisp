(setq set '(a b c d e f g p))
(defvar i 1)
(setq buffer '())

(defun newList (lst)
    (when lst
        (if (= i 3)
            (setq i 1)
            (progn 
                (incf i)
                (setq head (car lst))
                (push head buffer)))
            
        
        (setq tail (cdr lst))
        (newList tail))
    
    (setq buffer (reverse buffer)))


(newList set)
(print buffer)

 
  
  







