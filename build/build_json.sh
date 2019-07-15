filelist=`ls ./gitignore/*.gitignore`
echo "{"
for eachfile in $filelist
do
    filepath="$(basename -- $eachfile)"
    filename="${filepath%.*}"
    index=$(echo "$filename" | awk '{print tolower($0)}')
    echo "\"${index}\" : \"${filepath}\","
done
echo "}"