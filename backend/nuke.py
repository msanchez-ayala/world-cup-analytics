from analytics import models


def main() -> None:
    # order of objects that need to be created - teams -> players .. matches .. -> playermatchinfo
    print('Nuking entire database')

    models.PlayerMatchInfo.objects.all().delete()
    models.Match.objects.all().delete()
    models.Player.objects.all().delete()
    models.Team.objects.all().delete()

    print('Database nuking is complete')

## Since we're invoking with `python manage.py shell < populate.py` we don't
##  need this line
# if __name__ == "__main__":

main()

