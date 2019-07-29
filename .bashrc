# .bashrc

#set -o vi

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias feh='feh --scale-down --auto-zoom'
PS1='[\u@\h \W]\$ '
#Add new line before prompt
#PS1='\n[\u@\h \W]\$ '
#Colored prompt
#PS1='\e[0;32m[\u@\h \W]\$\e[m '

HISTSIZE=5000

bowie="bowie.ibeccreative.com"
dev="dev.ibeccreative.com"
kirk="kirk.ibeccreative.com"
spock="spock.ibeccreative.com"
linode="45.33.78.6"
linodedb="45.33.87.78"
linodedev="192.155.89.192"
nas="192.168.1.213"
pb="192.249.119.63"
pair="qs2185.pair.com"
