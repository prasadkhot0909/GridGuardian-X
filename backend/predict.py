def predict_health(temperature, load, oil_temperature):
    score = 0

    # Temperature Score
    if temperature > 90:
        score += 40
    elif temperature > 70:
        score += 20

    # Load Score
    if load > 90:
        score += 40
    elif load > 70:
        score += 20

    # Oil Temperature Score
    if oil_temperature > 80:
        score += 20
    elif oil_temperature > 60:
        score += 10

    failure_probability = min(score, 100)

    if failure_probability >= 70:
        health_status = "Critical"
    elif failure_probability >= 40:
        health_status = "Warning"
    else:
        health_status = "Healthy"

    return health_status, failure_probability