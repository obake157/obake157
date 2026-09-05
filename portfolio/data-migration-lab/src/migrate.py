import csv
from pathlib import Path

from validators import validate_rows

BASE_DIR = Path(__file__).resolve().parents[1]
SOURCE_FILE = BASE_DIR / "data" / "source_employees.csv"
OUTPUT_DIR = BASE_DIR / "output"
CLEAN_FILE = OUTPUT_DIR / "clean_employees.csv"
REJECTED_FILE = OUTPUT_DIR / "rejected_employees.csv"


def read_source() -> list[dict]:
    with SOURCE_FILE.open("r", encoding="utf-8", newline="") as file:
        return list(csv.DictReader(file))


def write_csv(path: Path, rows: list[dict]) -> None:
    if not rows:
        return

    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    source_rows = read_source()
    clean_rows, rejected_rows = validate_rows(source_rows)

    write_csv(CLEAN_FILE, clean_rows)
    write_csv(REJECTED_FILE, rejected_rows)

    print(f"Source rows: {len(source_rows)}")
    print(f"Accepted rows: {len(clean_rows)}")
    print(f"Rejected rows: {len(rejected_rows)}")


if __name__ == "__main__":
    main()
