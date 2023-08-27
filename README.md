# widgetComment
Assignment(HumanEdge)

STEPS:

1. clone the repo
2. copy the widget folder into your components.
3. import `CommentWidget.jsx` into your target file.
4. provide with necessary logged-in user details.
5. the c`omment.jsx` component handles the nested comment and threaded reply :
    props that has to be passed there are:
   a) comment->the recent comment, b) comments -> the replies of the recent comment, c) setComments -> setComments is a parent useState method, d) usersImage -> user image and other needed properties of the logged-in user. e) userId -> user Token of the logged-in user f) parentName -> in case of threaded reply the parent comment author's name. g) userName -> userName of the logged in user

6. As of now some dummy has been used in case of these value. Replace them with the necessary values.
      Css can be modified as per design requirements. Css used is modular css.

7. No external Libraries used.

8. the form.jsx component has these props : a) imageURL-> image of the logged-in user. b) addComment-> function from the parent commentWidget c) name-> name of the logged-in user d) userId-> user Token of the logged-in user e) handleSort-> handle sort function which takes care of the toggling sort. f) sort-> the recent to be shown active sort method.

9. local Storage uses can be removed or modified as per requirement in `commentWidget.jsx` component.

10. Nested comment and threaded replies are handled by component level recursion in `comment.js`.

ALL THE BEST AND HAPPY CODING !!!
