_forked off from [Ronzil's 2048 AI repo](https://github.com/ronzil/2048-AI)._
<!-- 
# 2048 AI - Using no hard-coded knowledge about the game.

AI for the game [2048](https://github.com/gabrielecirulli/2048).

See it in action [here](http://ronzil.github.io/2048-AI/).

After seeing several AI projects for the game, I was interested in creating an AI that does not contain any hard-coded knowledge about the game (like scoring functions, heuristics etc). Instead the AI should "find out for itself" without me, the programmer having to know anything about game strategy.

The implemented algorithm chooses which move to play like this: For each possible move, play it and then continue to play **random moves** until the game is finished. This is done many times and the move that returns the highest average score is chosen.

The success of the AI is surprising as a random-walk game finishes quite quickly, yet choosing the highest yielding move among the random-walk games, results in very good game play. Using only 100 runs per move the AI reaches the desired 2048 tile 80% of the runs and the 4096 tile 50%!

I've also created a version in C++ using the very clever and highly optimized version by nneonneo. You can find it [here](https://github.com/ronzil/2048-ai-cpp)

For a detailed discussion, [check out my answer on stackoverflow](http://stackoverflow.com/a/23853848/632039).

 -->
 
 
# Twenty Forty Great

Ever felt like you aren't judged enough as is? Do you want the crippling feeling of your every move being watched to extend into your free-time activities? Look no further, as twentyfortygreat uses state-of-the-art AI to judge your playthrough of 2048.

Taking inspiration from the great 2048 game, the wonderful auto-players made by numerous people, but in our case, specifically @ronzil, and chess.com's merciless analysis of your chess games and ability, we culminate this all into your favorite waste of time, 2048.

Enjoy countless features such as
- unnecessary overhead
- an annoying and condescending clippy-like character that judges your moves
- and an uncalled-for recap and analysis of your (probably failed) 2048 game.

And to stay afloat in this economy, we plan to add
- GPT-4 integration
- various pay-to-win features such as "unlock undo moves"
through an novel and innovative subscription (& advertisement) based revenue plan

We will be expecting an initial seed round as soon as I can convince one of my business major friends to stop playing golf every weekend.
