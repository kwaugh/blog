delete_lock_files() {
    echo "deleting lock files"
    rm -f /var/lib/mongodb/mongod.lock /data/db/mongod.lock
}

if [ -f ./backup.tgz ]; then
    echo "restoring from backup.tgz"
    rm -rf backup
    mkdir backup
    tar -xzf backup.tgz -C backup --strip-components 1
    delete_lock_files
    echo "starting mongod"
    mongod &
    sleep 10
    mongorestore backup
    rm -rf backup backup.tgz
    ps afx | grep mongod | awk '{print "kill -9 " $1}' | sh
else
    echo "no backup.tgz. not restoring"
fi
delete_lock_files
mongod
