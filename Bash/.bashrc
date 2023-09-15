####################################################################
####################################################################
####################################################################
# some more aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias c='clear'
alias ..='cd ..'

# Git related stuff
alias gst='git status'
alias gpl='git fetch --all; git pull; gst'

alias gmain='git switch main; gpl'
alias gmaster='git switch master; gpl'

# NPM related stuff
alias ncl='rm -rf node_modules/'
alias nis='npm install; npm start'

# Go to project shortcuts
alias gtcode='cd ~/code; c; ll'
alias gtui='cd ~/code/ui; c; ll'
alias gtflow='cd ~/code/flow; c; ll'

# Go to project shortcuts
alias opui='gtui; subl .'

# Test db stuff
alias gtdb='cd ~/dbs/'
alias dbip_admin='docker inspect pgadmin4_container_wild_west -f "Admin    : {{json .NetworkSettings.Networks.supabase_network_flow.IPAddress }}"'
alias dbip_pg='docker inspect postgres_container_wild_west -f "Postgres : {{json .NetworkSettings.Networks.supabase_network_flow.IPAddress }}"'
alias dbip='dbip_admin; dbip_pg;'
alias dbup='gtdb; docker-compose up -d; dbip;'
alias dbdown='gtdb; docker-compose down;'

. "$HOME/.cargo/env"

# https://forums.docker.com/t/how-to-delete-cache/5753
alias docker_clean_images='docker rmi $(docker images -a --filter=dangling=true -q)'
alias docker_clean_ps='docker rm $(docker ps --filter=status=exited --filter=status=created -q)'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export PATH=/usr/local/go/bin:$PATH
export PATH=$PATH:~/code/flow/.build/package/bin
export PATH=$PATH:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin
export PATH="$HOME/.local/bin:$PATH"
export PATH=$NVM_DIR:$PATH

export EDITOR='subl -w'
####################################################################
####################################################################
####################################################################