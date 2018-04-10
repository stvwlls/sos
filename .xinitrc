xrdb -merge .Xresources
#exec ck-launch-session dbus-launch --exit-with-session openbox-session
#export GDK_SCALE=2
#export GDK_DPI_SCALE=0.5
#export GDK_DPI_SCALE=2

exec dbus-launch --exit-with-session openbox-session

