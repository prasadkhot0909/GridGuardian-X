def predict_health(temperature, load, oil_temperature):
    score = 0
    reasons = []

    # Temperature Score & Root Cause
    if temperature > 90:
        score += 40
        reasons.append(f"High core winding temperature ({temperature}°C)")
    elif temperature > 70:
        score += 20
        reasons.append(f"Elevated core temperature ({temperature}°C)")

    # Load Score & Root Cause
    if load > 90:
        score += 40
        reasons.append(f"Extreme capacity load ({load}%)")
    elif load > 70:
        score += 20
        reasons.append(f"High operating load ({load}%)")

    # Oil Temperature Score & Root Cause
    if oil_temperature > 80:
        score += 20
        reasons.append(f"Critical oil thermal overload ({oil_temperature}°C)")
    elif oil_temperature > 60:
        score += 10
        reasons.append(f"Elevated oil temperature ({oil_temperature}°C)")

    failure_probability = min(score, 100)

    # Determine Health Status
    if failure_probability >= 70:
        health_status = "Critical"
    elif failure_probability >= 40:
        health_status = "Warning"
    else:
        health_status = "Healthy"

    # Compile Final Reason String
    if health_status == "Healthy" or not reasons:
        failure_reason = "All telemetry parameters within normal operating ranges."
    else:
        failure_reason = " | ".join(reasons)

    return health_status, failure_probability, failure_reason