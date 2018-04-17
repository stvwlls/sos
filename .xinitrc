xrdb -DENV_HOME="${HOME}" -load ~/.Xresources
#xrdb ~/.Xresources
#exec ck-launch-session dbus-launch --exit-with-session openbox-session
#export GDK_SCALE=2
#export GDK_DPI_SCALE=1.5
exec dbus-launch --exit-with-session openbox-session

