(let ((firstLst '(1 2 3 4 5)) (secondLst '(2 4 6 5 8 10)))
    (defvar concatLst (append firstLst secondLst)))


(defvar sum 0)


(defun sumSet (lst &optional (a 0))
    (when lst
         (let ((a (mod (car lst) 2)))
             (if (= a 0)
                 (incf sum (car lst)))
             (sumSet (cdr lst))))
    (return-from sumSet sum))

(let ((res (sumSet concatLst)))
    (print res))
