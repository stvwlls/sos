# Steve's Operating System

##Void packages:

xorg-minimal xrdb xsetroot gnome-icon-theme xf86-video-intel gtk-engine-murrine openbox tint2 alsa-utils firefox rxvt-unicode vim-x11 pidgin moc gsimplecal gmrun feh mutt galculator lxrandr keychain unzip ufw

add fonts: dejavu, insonsolata

##Void post-installation

Services
```
sudo ln -s /etc/sv/acpid /var/service/
```

Enable dhcpcd service
```
sudo ln -s /etc/sv/dhcpcd /var/service/
```

Enable dbus service
ln -s /etc/sv/dbus /var/service/dbus

<!--

Debian packages:

xorg dbus-x11 openbox tint2 gtk2-engines-murrine alsa-utils chromium rxvt-unicode vim-gtk pidgin moc gsimplecal gmrun feh sudo mutt wicd galculator arandr

For Thunar remote filesystems: gvfs-backends? policykit-1? gvfs? gvfs-fuse?

-->
