FROM mysql:5.7

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update -y && apt-get install -qq -y --no-install-recommends curl wget vim sudo
RUN apt-get update -y && sudo apt-get upgrade -y
